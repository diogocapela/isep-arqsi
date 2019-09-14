using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Bogus;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Factory.Infrastructure.Repositories
{
    public class ProductionLineRepository : IProductionLineRepository
    {
        private readonly FactoryContext _context;
        private const int DefaultTake = 50;
        
        public ProductionLineRepository(FactoryContext context)
        {
            _context = context;
        }
        
        public async Task<ProductionLine> GetById(int id)
        {
            return await _context.Set<ProductionLine>().Include(m => m.Machines).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<ProductionLine> FirstOrDefault(Expression<Func<ProductionLine, bool>> predicate)
        {
            return await _context.Set<ProductionLine>().Include(m=> m.Machines).FirstOrDefaultAsync(predicate);
        }

        public async Task<ProductionLine> Create(ProductionLine entity)
        {
            await _context.Set<ProductionLine>().AddAsync(entity);
            
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ProductionLine> Update(ProductionLine entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(ProductionLine entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductionLine>> GetAll(int skip, int take)
        {
            return await _context.Set<ProductionLine>().Include(m=> m.Machines).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<ProductionLine>> GetAll()
        {
            return await _context.Set<ProductionLine>().Include(m=> m.Machines).Take(DefaultTake).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<ProductionLine>> GetWhere(Expression<Func<ProductionLine, bool>> predicate, int skip, int take)
        {
            return await _context.Set<ProductionLine>().Include(m=> m.Machines).Where(predicate).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        } 
    }
}