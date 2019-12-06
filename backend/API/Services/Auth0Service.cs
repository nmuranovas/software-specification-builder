using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Persistence.Commands;
using Persistence.Models;
using Persistence.Queries;

namespace API.Services
{
    public class UserDetailsResponse
    {
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("picture")]
        public string PictureUrl { get; set; }
        [JsonProperty("nickname")]
        public string Nickname { get; set; }
    }

    public class Auth0Service : IAuth0Service
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IUserCommands _userCommands;
        private readonly IUserQueries _userQueries;
        private readonly IConfiguration _configuration;

        public Auth0Service(IHttpClientFactory clientFactory, IUserCommands userCommands, IUserQueries userQueries, IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _userCommands = userCommands;
            _userQueries = userQueries;
            _configuration = configuration;
        }

        public async Task<UserDetailsResponse> CreateUser(string token)
        {
            var client = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, _configuration["Auth0:UserInfoLink"]);
            request.Headers.Add("Authorization", token);

            var response = await client.SendAsync(request);
            if (!response.IsSuccessStatusCode)
                throw new InvalidOperationException("Failed to get user from auth0");

            await using var responseStream = await response.Content.ReadAsStreamAsync();
            var responseString = new StreamReader(responseStream).ReadToEnd();
            var userDetails = JsonConvert.DeserializeObject<UserDetailsResponse>(responseString);
            return userDetails;
        }
    }
}