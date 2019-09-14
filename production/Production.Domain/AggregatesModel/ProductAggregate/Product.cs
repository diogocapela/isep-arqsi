using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.SeedWork;

namespace Production.Domain.AggregatesModel.ProductAggregate
{
    [Table("Product")]
    public class Product : Entity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public string ProductDescription { get; set; }
        [Required]
        public long ProductPrice { get; set; }
        [Required]
        public virtual ManufacturingPlan ManufacturingPlan { get; set; }
    }
}