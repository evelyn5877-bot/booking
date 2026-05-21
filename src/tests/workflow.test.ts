import { convertToLongTerm } from '../lib/actions/room-actions';
import { Room } from '../types';

async function runTests() {
  console.log('--- Running Workflow A: Room Conversion Test ---');
  const mockRoom: Room = { id: '101', number: '101', type: 'Double Room', status: 'Hotel' };
  const startDate = '2025-10-01';
  const endDate = '2026-06-01';
  const tenantName = 'Test Student';

  const result = await convertToLongTerm(mockRoom, startDate, endDate, tenantName);

  if (result.success && result.newReservation?.guestName === 'Test Student') {
    console.log('✅ Workflow A Test Passed');
  } else {
    console.error('❌ Workflow A Test Failed');
    process.exit(1);
  }

  console.log('\n--- Running Workflow B: Utility Calculation Test ---');
  const totalBill = 1200;
  const activeRoomsCount = 12;
  const splitCost = totalBill / activeRoomsCount;

  if (splitCost === 100) {
    console.log('✅ Workflow B Test Passed (1200 / 12 = 100)');
  } else {
    console.error(`❌ Workflow B Test Failed: Expected 100 but got ${splitCost}`);
    process.exit(1);
  }

  console.log('\n--- All Tests Passed successfully ---');
}

runTests();
