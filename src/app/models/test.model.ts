export interface Test 
{
  testId: number;  //  corrected to match backend
  vetRegistrationNumber: number;
  petType: string;
  petMicrochipNumber: number;
  ownerIdCardNumber: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerContactNumber: string;
  ownerEmailAddress: string;
  ownerAddress: string;
  ownerLocality: string;
  ownerPostCode: string;
  isVirusDetected: boolean;
}