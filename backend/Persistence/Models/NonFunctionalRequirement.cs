namespace Persistence.Models
{
    public class NonFunctionalRequirement
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public uint OrderNumber { get; set; }

        public int SpecificationId { get; set; }
        public Specification Specification { get; set; }
    }
}
