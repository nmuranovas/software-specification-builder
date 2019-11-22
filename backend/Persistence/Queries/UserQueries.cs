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

        public Task<User> FindUser(string email)
        {
            return _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}