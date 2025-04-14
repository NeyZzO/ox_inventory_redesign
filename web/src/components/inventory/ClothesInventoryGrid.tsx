import React from 'react';
import { Inventory } from '../../typings';
import InventorySlot from './InventorySlot';
import bag from "../../assets/bag.png"



const ClothesInventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {


    console.log(inventory);
    return (
      <>
        <div className="inventory-grid-wrapper">
  
          <div className="inventory-grid-container" >
            <>
              {inventory.items.map((item, index) => (
                <InventorySlot
                  key={`${inventory.type}-${inventory.id}-${item.slot}`}
                  item={item}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              ))}
            </>
          </div>
        </div>
      </>
    );
  };
  
export default ClothesInventoryGrid;