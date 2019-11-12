using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Persistence.Migrations
{
    public partial class Initialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Specifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(nullable: true),
                    Audience = table.Column<string>(nullable: true),
                    IntendedUse = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    LastModified = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FunctionalRequirements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(nullable: true),
                    OrderNumber = table.Column<long>(nullable: false),
                    SpecificationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionalRequirements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FunctionalRequirements_Specifications_SpecificationId",
                        column: x => x.SpecificationId,
                        principalTable: "Specifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NonFunctionalRequirements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(nullable: true),
                    OrderNumber = table.Column<long>(nullable: false),
                    SpecificationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NonFunctionalRequirements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NonFunctionalRequirements_Specifications_SpecificationId",
                        column: x => x.SpecificationId,
                        principalTable: "Specifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FunctionalRequirements_SpecificationId",
                table: "FunctionalRequirements",
                column: "SpecificationId");

            migrationBuilder.CreateIndex(
                name: "IX_NonFunctionalRequirements_SpecificationId",
                table: "NonFunctionalRequirements",
                column: "SpecificationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FunctionalRequirements");

            migrationBuilder.DropTable(
                name: "NonFunctionalRequirements");

            migrationBuilder.DropTable(
                name: "Specifications");
        }
    }
}
