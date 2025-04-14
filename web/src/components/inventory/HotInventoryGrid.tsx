import React from 'react';
import { Inventory } from '../../typings';
import InventorySlot from './InventorySlot';
import bag from "../../assets/bag.png"


const HotInventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {


  return (
    <>
      <div className="hotinventory-grid-wrapper">
      <div className='label-container'>
              <img src={bag} alt="" />
            <p>POCHES</p>
            </div>
        <div className='line'></div>


        <div className="hotinventory-grid-container" >
          <>
            {inventory.items.slice(0, 5).map((item, index) => (
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

export default HotInventoryGrid;
