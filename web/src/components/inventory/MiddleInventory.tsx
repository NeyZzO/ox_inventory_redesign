import InventoryGrid from './InventoryGrid';
import { useAppSelector } from '../../store';
import { selectLeftInventory, selectMiddleInventory } from '../../store/inventory';
import ClothesInventoryGrid from './ClothesInventoryGrid';

const MiddleInventory: React.FC = () => {
  const middleInventory = useAppSelector(selectMiddleInventory);

  return <ClothesInventoryGrid inventory={middleInventory} />;
};

export default MiddleInventory;
