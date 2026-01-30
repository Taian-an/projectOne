import items from "../data/pos_item.json";
import "../App.css";

function SalesJournal() {
  return (
    <div className="container">
      <h1>Sales Journal</h1>
      <p className="subtitle">
        Product & Inventory Record (Data from POS System)
      </p>

      <table className="journal-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Unit Price</th>
            <th>Inventory</th>
            <th>Stock Value</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.itemName}</td>
              <td>{item.category}</td>
              <td>{item.unitPrice}</td>
              <td>{item.inventory}</td>
              <td>{item.unitPrice * item.inventory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesJournal;
