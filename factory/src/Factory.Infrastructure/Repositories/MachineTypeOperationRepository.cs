using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.SeedWork;
using Factory.Domain.Services;


namespace Factory.Infrastructure.Repositories
{
    public class MachineTypeOperationRepository : IMachineTypeOperationRepository
    {
        private readonly FactoryContext _context;
        private const int DefaultTake = 50;

        public MachineTypeOperationRepository(FactoryContext context)
        {
            _context = context;
        }

        public async Task<MachineTypeOperation> GetById(int machineTypeId, int operationId)
        {
            return await _context.Set<MachineTypeOperation>().FindAsync(machineTypeId, operationId);
        }

        public async Task<MachineTypeOperation> FirstOrDefault(Expression<Func<MachineTypeOperation, bool>> predicate)
        {
            return await _context.Set<MachineTypeOperation>().FirstOrDefaultAsync(predicate);
        }

        public async Task<MachineTypeOperation> Create(MachineTypeOperation entity)
        {
             await _context.Set<MachineTypeOperation>().AddAsync(entity);
             await _context.SaveChangesAsync();
             return entity;
        }

        public async Task<MachineTypeOperation> Update(MachineTypeOperation entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public void Delete(MachineTypeOperation entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<MachineTypeOperation>> GetAll(int skip, int take)
        {
            return await _context.Set<MachineTypeOperation>().Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<MachineTypeOperation>> GetAll()
        {
            return await _context.Set<MachineTypeOperation>().Take(DefaultTake).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<MachineTypeOperation>> GetWhere(
            Expression<Func<MachineTypeOperation, bool>> predicate, int skip, int take)
        {
            return await _context.Set<MachineTypeOperation>().Where(predicate).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }
    }
}