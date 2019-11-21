using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Commands
{
    public class UserCommands : IUserCommands
    {
        private readonly SpecificationContext _context;

        public UserCommands(SpecificationContext context)
        {
            _context = context;
        }

        public async Task InsertUser(string email, string pictureUrl, string nickname)
        {
            var newUser = new User
            {
                Email = email,
                Nickname = nickname,
                PictureUrl = pictureUrl
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
        }
    }
}