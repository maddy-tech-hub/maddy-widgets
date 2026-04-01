export interface ContactWidgetProps {
  title: string;
  submitTitle: string;
  introEyebrow?: string;
  introSubtitle?: string;
  sidebarEyebrow?: string;
  sidebarTitle?: string;
  sidebarDescription?: string;
  successMessage?: string;
  errorMessage?: string;
  unconfiguredMessage?: string;
  formFields: Array<{
    id: string; // ID for the field (e.g., "email", "name")
    label: string; // Label for the field (e.g., "Your Name")
    type: string; // Type of input (e.g., "text", "email", "textarea")
    placeholder: string; // Placeholder text for the input field
    required?: boolean; // Whether the field is required (optional)
  }>;

  // Array of contact info objects (e.g., email, phone, address)
  contactInfo: Array<{
    icon: React.ReactNode; // React node for the icon (e.g., a FontAwesome icon)
    label: string; // Label for the contact info (e.g., "Phone", "Email")
    value: string | React.ReactNode; // Value can be a string (e.g., "contact@domain.com") or React node
  }>;

  // Optional configuration for Email.js (to send emails via Email.js)
  emailConfig?: {
    serviceId: string; // Service ID for Email.js
    templateId: string; // Template ID for Email.js
    userId: string; // User ID for Email.js
  };

  // Optional URL for an external API where the form data will be submitted
  externalApiUrl?: string;

  // Optional function to set the loading state (used to indicate when the form is submitting)
  setLoading?: (isLoading: boolean) => void; // Function that accepts a boolean to set loading state
}
