using Microsoft.EntityFrameworkCore;

namespace ApiGateway
{
    public class Context:DbContext
    {
        public Context(DbContextOptions options) : base(options)
        {
        }
    }
}
