using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Factory.Domain.AggregatesModel.ToolAggregate
{
    [Table("Tool")]
    public class Tool
    {
        [Key]
        [Column("Tool")]
        public string Name { get; set; }
    }
}