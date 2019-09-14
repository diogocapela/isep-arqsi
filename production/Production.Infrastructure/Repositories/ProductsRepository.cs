using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Production.Domain.AggregatesModel.ProductAggregate;
using Production.Domain.Repositories;
using Production.Infrastructure.Persistence;

namespace Production.Infrastructure.Repositories
{
    public class ProductsRepository : IProductsRepository
    {
        
        private readonly ProductionContext _context;

        public ProductsRepository(ProductionContext context)
        {
            _context = context;
        }

        
        public async Task<Product> GetById(int id)
        {
            return await _context.Set<Product>().Include(p=>p.ManufacturingPlan).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Product> FirstOrDefault(Expression<Func<Product, bool>> predicate)
        {
            return await _context.Set<Product>().Include(p => p.ManufacturingPlan).Where(predicate)
                .FirstOrDefaultAsync();
        }

        public async Task<Product> Create(Product entity)
        {
            await _context.Set<Product>().AddAsync(entity);
            
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Product> Update(Product entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(Product entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Product>> GetAll(int from, int to)
        {
            return await _context.Set<Product>().Include(p=> p.ManufacturingPlan).Skip(from).Take(to).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetAll()
        {            
            return await _context.Set<Product>().Include(p=> p.ManufacturingPlan).Skip(0).Take(50).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetWhere(Expression<Func<Product, bool>> predicate, int skip, int take)
        {
            return await _context.Set<Product>().Include(p=> p.ManufacturingPlan).Skip(skip).Take(take).Where(predicate).ToListAsync();

        }
    }
}