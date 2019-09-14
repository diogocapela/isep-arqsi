using Microsoft.EntityFrameworkCore.Migrations;

namespace Factory.API.Migrations
{
    public partial class MajorRefactorTools : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StartupTime",
                table: "Operation",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ToolName",
                table: "Operation",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Machine",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Tool",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tool", x => x.Name);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Operation_ToolName",
                table: "Operation",
                column: "ToolName");

            migrationBuilder.AddForeignKey(
                name: "FK_Operation_Tool_ToolName",
                table: "Operation",
                column: "ToolName",
                principalTable: "Tool",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operation_Tool_ToolName",
                table: "Operation");

            migrationBuilder.DropTable(
                name: "Tool");

            migrationBuilder.DropIndex(
                name: "IX_Operation_ToolName",
                table: "Operation");

            migrationBuilder.DropColumn(
                name: "StartupTime",
                table: "Operation");

            migrationBuilder.DropColumn(
                name: "ToolName",
                table: "Operation");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "Machine");
        }
    }
}
