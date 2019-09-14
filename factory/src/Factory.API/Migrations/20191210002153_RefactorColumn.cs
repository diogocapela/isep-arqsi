using Microsoft.EntityFrameworkCore.Migrations;

namespace Factory.API.Migrations
{
    public partial class RefactorColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tool",
                newName: "Tool");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tool",
                table: "Tool",
                newName: "Name");
        }
    }
}
