﻿// <auto-generated />
using System;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Factory.API.Migrations
{
    [DbContext(typeof(FactoryContext))]
    partial class FactoryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Factory.Domain.AggregatesModel.MachineAggregate.Machine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("MachineName")
                        .IsRequired();

                    b.Property<int>("MachineTypeId");

                    b.Property<int?>("ProductionLineId");

                    b.HasKey("Id");

                    b.HasIndex("MachineTypeId");

                    b.HasIndex("ProductionLineId");

                    b.ToTable("Machine");
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.MachineTypeAggregate.MachineType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("NameMachineType")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("MachineType");
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.MachineTypeOperationAggregate.MachineTypeOperation", b =>
                {
                    b.Property<int>("OperationId");

                    b.Property<int>("MachineTypeId");

                    b.HasKey("OperationId", "MachineTypeId");

                    b.HasAlternateKey("MachineTypeId", "OperationId");

                    b.ToTable("MachineTypeOperations");
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.OperationAggregate.Operation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("OperationName")
                        .IsRequired();

                    b.Property<int>("StartupTime");

                    b.Property<int>("TimeTakes");

                    b.Property<string>("ToolName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ToolName");

                    b.ToTable("Operation");
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.ProductionLineAggregate.ProductionLine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("ProductionName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("ProductionLine");
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.ToolAggregate.Tool", b =>
                {
                    b.Property<string>("Name")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Tool");

                    b.HasKey("Name");

                    b.ToTable("Tool");
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.MachineAggregate.Machine", b =>
                {
                    b.HasOne("Factory.Domain.AggregatesModel.MachineTypeAggregate.MachineType", "MachineType")
                        .WithMany()
                        .HasForeignKey("MachineTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Factory.Domain.AggregatesModel.ProductionLineAggregate.ProductionLine")
                        .WithMany("Machines")
                        .HasForeignKey("ProductionLineId");
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.MachineTypeOperationAggregate.MachineTypeOperation", b =>
                {
                    b.HasOne("Factory.Domain.AggregatesModel.MachineTypeAggregate.MachineType", "machinetype")
                        .WithMany("machineTypeOperations")
                        .HasForeignKey("MachineTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Factory.Domain.AggregatesModel.OperationAggregate.Operation", "operation")
                        .WithMany("MachineTypeOperations")
                        .HasForeignKey("OperationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Factory.Domain.AggregatesModel.OperationAggregate.Operation", b =>
                {
                    b.HasOne("Factory.Domain.AggregatesModel.ToolAggregate.Tool", "Tool")
                        .WithMany()
                        .HasForeignKey("ToolName")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
