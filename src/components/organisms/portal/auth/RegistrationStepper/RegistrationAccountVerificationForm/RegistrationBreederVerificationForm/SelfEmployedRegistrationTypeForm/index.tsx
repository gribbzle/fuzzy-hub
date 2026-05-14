import { FileUploaderField, TextField } from "@portal/ui/molecules";

const SelfEmployedRegistrationTypeForm = () => (
  <>
    <TextField label="Full Legal Name" name="full_legal_name" />
    <TextField
      label="Residential Address (Optional)"
      name="residential_address"
    />
    <TextField
      label="Government-issued ID Number"
      name="government_id_number"
    />
    <FileUploaderField
      name="id_image"
      placeholder="Upload ID Image"
      label="ID Image"
    />
  </>
);

export default SelfEmployedRegistrationTypeForm;
