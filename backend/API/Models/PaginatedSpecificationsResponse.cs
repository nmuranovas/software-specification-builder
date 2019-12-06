using Persistence.Models;

namespace API.Models
{
    public class PaginatedResponse<T>
    {
        public T Data { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItemCount { get; set; }
    }

    public class PaginatedResponseFactory
    {
        public static PaginatedResponse<T> Create<T>(T data, int page, int pageSize, int totalItemCount)
        {
            return new PaginatedResponse<T>
            {
                Data = data,
                Page = page,
                PageSize = pageSize,
                TotalItemCount = totalItemCount
            };
        }

        public static PaginatedResponse<T> CreateEmpty<T>()
        {
            return new PaginatedResponse<T>();
        }
    }
}