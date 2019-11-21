using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
    }
}