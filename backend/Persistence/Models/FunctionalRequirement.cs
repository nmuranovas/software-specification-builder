namespace Persistence.Models
{
    public class FunctionalRequirement
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public uint OrderNumber { get; set; }

        public int SpecificationId { get; set; }
        public Specification Specification { get; set; }
    }
}
