import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const addTaxPayerForm = document.getElementById('addTaxPayerForm');
  const searchTaxPayerForm = document.getElementById('searchTaxPayerForm');
  const taxPayerList = document.getElementById('taxPayerList');
  const searchResult = document.getElementById('searchResult');

  // Function to display all TaxPayers
  async function displayAllTaxPayers() {
    const taxPayers = await backend.getAllTaxPayers();
    taxPayerList.innerHTML = '';
    taxPayers.forEach(taxPayer => {
      const li = document.createElement('li');
      li.textContent = `TID: ${taxPayer.tid}, Name: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
      taxPayerList.appendChild(li);
    });
  }

  // Add TaxPayer form submission
  addTaxPayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    addTaxPayerForm.reset();
    displayAllTaxPayers();
  });

  // Search TaxPayer form submission
  searchTaxPayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTid = document.getElementById('searchTid').value;
    const result = await backend.searchTaxPayer(searchTid);

    if (result) {
      searchResult.textContent = `Found: TID: ${result.tid}, Name: ${result.firstName} ${result.lastName}, Address: ${result.address}`;
    } else {
      searchResult.textContent = 'TaxPayer not found';
    }
  });

  // Initial display of all TaxPayers
  displayAllTaxPayers();
});
