using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Issues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    CreatorId = table.Column<string>(type: "TEXT", nullable: true),
                    AssigneeId = table.Column<string>(type: "TEXT", nullable: true),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Deadline = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Priority = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Issues_AspNetUsers_AssigneeId",
                        column: x => x.AssigneeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Issues_AspNetUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "IssueCompetence",
                columns: table => new
                {
                    CompetenceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    IssueId = table.Column<Guid>(type: "TEXT", nullable: false),
                    KnowledgePriority = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IssueCompetence", x => new { x.IssueId, x.CompetenceId });
                    table.ForeignKey(
                        name: "FK_IssueCompetence_Competences_CompetenceId",
                        column: x => x.CompetenceId,
                        principalTable: "Competences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IssueCompetence_Issues_IssueId",
                        column: x => x.IssueId,
                        principalTable: "Issues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_IssueCompetence_CompetenceId",
                table: "IssueCompetence",
                column: "CompetenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_AssigneeId",
                table: "Issues",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_CreatorId",
                table: "Issues",
                column: "CreatorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IssueCompetence");

            migrationBuilder.DropTable(
                name: "Issues");
        }
    }
}
