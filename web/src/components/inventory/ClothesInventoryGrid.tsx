import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import bag from '../../assets/bag.png'
import weights from '../../assets/weight.png'
const PAGE_SIZE = 30;
// Icons
import { FaShirt, FaVest, FaBagShopping } from "react-icons/fa6";
import { PiMaskHappyFill, PiPantsFill, PiScissorsFill, PiSneakerFill } from "react-icons/pi";
import { GiKevlarVest, GiBilledCap, GiWinterGloves, GiEarrings, GiDoorRingHandle, GiPearlNecklace  } from "react-icons/gi";
import { IoWatch } from "react-icons/io5";
import { MdBadge } from "react-icons/md";
import { BsSunglasses } from "react-icons/bs";


/*

  0 = Chapeau/Casquette         8 = Masque
  

*/
const icons: any = {
  1: <GiBilledCap />,     9: <PiMaskHappyFill />,
  2: <GiEarrings />,      10: <BsSunglasses />,
  3: <GiPearlNecklace />, 11: <PiScissorsFill />,
  4: <GiKevlarVest />,    12: <FaShirt />,
  5: <MdBadge />,         13: <FaVest />,
  6: <GiWinterGloves />,  14: <GiDoorRingHandle />,
  7: <FaBagShopping />,   15: <IoWatch />,
  8: <PiPantsFill />,     16: <PiSneakerFill />
} 

const getIconFromSlotNbr = (nbr: number) => (icons[nbr] || <FaShirt />);

const InventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  console.log((page + 1) * PAGE_SIZE);
  return (
    <>
      <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
        <div>
          <div className="inventory-grid-header-wrapper">
            <div className='label-container'>
              <img src={bag} alt="" />
              <p>{"Vêtements"}</p>
            </div>
          </div>

        </div>
        <div className={"clothing-grid-container"} ref={containerRef}>
          <div className="clothing-left">
            {inventory.items.slice(0, inventory.slots / 2).map((item, index) => {
              return (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
                icon={getIconFromSlotNbr(item.slot)}
              />
            )})}
          </div>
          <div className="player-display">
            
          </div>
          <div className="clothing-right">
            {inventory.items.slice(inventory.slots / 2, inventory.slots ).map((item, index) => {
              return (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
                icon={getIconFromSlotNbr(item.slot)}
              />
            )})}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryGrid;
