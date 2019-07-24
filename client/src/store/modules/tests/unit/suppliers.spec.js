import SupplierService from '@/services/suppliers'
import suppliersStore from '@/store/modules/suppliers';
import * as types from '@/store/mutation-types'

jest.mock('@/services/suppliers', () => {
  return {
    getSuppliers: jest.fn(),
    createSupplier: jest.fn(),
    deleteSupplier: jest.fn()
  };
});

describe('suppliers store', () => {
  describe('mutations', () => {
    it(types.FETCH_SUPPLIERS, () => {
      const state = { all: [] };
      const mutation = suppliersStore.mutations[types.FETCH_SUPPLIERS];
      
      mutation(state, {suppliers: [1, 2]});
      expect(state.all).toEqual([1, 2]);
    });

    it(types.CREATE_SUPPLIER, () => {
      const state = { all: [1] };
      const mutation = suppliersStore.mutations[types.CREATE_SUPPLIER];
      
      mutation(state, {supplier: 2});
      expect(state.all).toEqual([1, 2]);
    });

    it(types.DELETE_SUPPLIER, () => {
      const state = { all: [{id: 1}, {id: 2}] };
      const mutation = suppliersStore.mutations[types.DELETE_SUPPLIER];
      
      mutation(state, {id: 1});
      expect(state.all).toEqual([{id: 2}]);
    });
  });

  describe('actions', () => {
    it('fetchSuppliers', async () => {
      const commit = jest.fn();
      const suppliers = [1, 2];
      SupplierService.getSuppliers.mockResolvedValueOnce({data: suppliers});

      suppliersStore.actions.fetchSuppliers({ commit });
      await SupplierService.getSuppliers();

      expect(SupplierService.getSuppliers).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith(types.FETCH_SUPPLIERS, { suppliers });
    });

    it('createSupplier', async () => {
      const commit = jest.fn();
      SupplierService.createSupplier.mockResolvedValueOnce({});
      const supplier = {id: 1};
      global.router = {
        push: jest.fn()
      };

      suppliersStore.actions.createSupplier({ commit }, supplier);
      await SupplierService.createSupplier();

      expect(SupplierService.createSupplier).toHaveBeenCalledWith(supplier);
      expect(commit).toHaveBeenCalledWith(types.CREATE_SUPPLIER, { supplier });
      expect(global.router.push).toHaveBeenCalledWith({ name: 'DisplaySupplier' });
    });

    it('deleteSupplier', async () => {
      const commit = jest.fn();
      const supplierId = 1;
      SupplierService.deleteSupplier.mockResolvedValueOnce({});

      suppliersStore.actions.deleteSupplier({ commit }, supplierId);
      await SupplierService.deleteSupplier();

      expect(SupplierService.deleteSupplier).toHaveBeenCalledWith(supplierId);
      expect(commit).toHaveBeenCalledWith(types.DELETE_SUPPLIER, { id: supplierId });
    });
  });

  describe('getters', () => {
    it('allSuppliers', () => {
      const state = {
        all: [1, 2, 3]
      };
        
      const result = suppliersStore.getters.allSuppliers(state);
      expect(result).toEqual(state.all);
    });
  });
});
