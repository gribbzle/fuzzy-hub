import { FileUploaderField, TextField } from "@portal/ui/molecules";

const CompanyRegistrationTypeForm = () => (
  <>
    <TextField label="Company Name" name="company_name" />
    <TextField label="Company Address" name="company_address" />
    <div className="grid grid-cols-1 gap-4 max-large-desktop:tablet:grid-cols-2">
      <TextField label="Tax ID (EIN)" name="tax_id" />
      <TextField
        label="Business License Number"
        name="business_license_number"
      />
      <FileUploaderField
        label="Business License"
        name="license_image"
        placeholder="Upload Business License"
      />
      <FileUploaderField
        label="Insurance"
        name="liability_insurance"
        placeholder="Upload Insurance"
      />
    </div>
  </>
);

export default CompanyRegistrationTypeForm;
