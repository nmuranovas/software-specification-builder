using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Persistence.Commands;
using Persistence.Models;
using Persistence.Queries;

namespace API.Middleware
{
    public class UserDetailsResponse
    {
        public string Email { get; set; }
        public string PictureUrl { get; set; }
        public string Nickname { get; set; }
    }

    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IAuthenticationService authenticationService, IHttpClientFactory clientFactory, IConfiguration configuration, IUserQueries userQueries, IUserCommands userCommands)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                var client = clientFactory.CreateClient();
                var request = new HttpRequestMessage(HttpMethod.Get, configuration["Auth0:Authority"] + "userinfo");
                if (!context.Request.Headers.TryGetValue("Authorization", out var bearerWithToken))
                    await _next(context);
                request.Headers.Add("Authorization", bearerWithToken.ToString());

                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    await using var responseStream = await response.Content.ReadAsStreamAsync();
                    var responseString = new StreamReader(responseStream).ReadToEnd();
                    dynamic userDetails = JObject.Parse(responseString);
                    var userFromDatabase = await userQueries.FindUser((string) userDetails.email);
                    if (userFromDatabase == null)
                    {
                        userFromDatabase = await userCommands.InsertUser((string)userDetails.email, (string)userDetails.picture, (string)userDetails.nickname);
                        Console.WriteLine($"User {(string)userDetails.Email} inserted to database");
                    }

                    context.Items["User"] = userFromDatabase;
                }
            }

            await _next(context);
        }
    }

    public static class AuthenticationMiddlewareExtensions
    {
        public static IApplicationBuilder UserAuthenticationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthenticationMiddleware>();
        }
    }
}