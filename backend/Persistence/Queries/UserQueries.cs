using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Persistence.Models;

namespace Persistence.Queries
{
    public class UserQueries : IUserQueries
    {
        private readonly SpecificationContext _context;

        public UserQueries(SpecificationContext context)
        {
            _context = context;
        }

        public Task<bool> UserExists(string email)
        {
            return _context.Users.AnyAsync(u => u.Email == email);
        }

        public Task<User> FindUser(string auth0Id)
        {
            return _context.Users.FirstOrDefaultAsync(u => u.Auth0Id == auth0Id);
        }

        public async Task<bool> SpecificationBelongsToUser(int userId, int specificationId)
        {
            var user = await _context.Users.Include(u => u.Specifications).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found in database");
            }
            else
            {
                return user.Specifications.Any(s => s.Id == specificationId);
            }
        }

        public async Task<bool> SpecificationBelongsToUser(string userAuth0Id, int specificationId)
        {
            var user = await _context.Users.Include(u => u.Specifications).FirstOrDefaultAsync(u => u.Auth0Id == userAuth0Id);
            if (user == null)
            {
                throw new InvalidOperationException("User not found in database");
            }
            else
            {
                return user.Specifications.Any(s => s.Id == specificationId);
            }
        }
    }
}