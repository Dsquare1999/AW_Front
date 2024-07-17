"use client";
import { random } from "lodash";
import { Reorder } from "framer-motion";
import { useState } from "react";

const Calcul = () => {
  const [items, setItems] = useState([0, 1, 2, 3]);
  return (
    <div>
      Nombre de calcul par session : {random(5001, 6784)}
      <div>
        <h2>Reordering :</h2>
        <div className="flex space-x-5">
          <Reorder.Group
            axis="x"
            values={items}
            onReorder={setItems}
            className="flex"
          >
            {items.map((item) => (
              <Reorder.Item key={item} value={item}>
                <div className="shadow rounded w-[100px] h-[100px] flex flex-col justify-center items-center">
                  <span>Item {item}</span>
                  <button
                    onClick={() =>
                      setItems((prev) => prev.filter((i) => i !== item))
                    }
                  >
                    Delete
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
};

export default Calcul;
