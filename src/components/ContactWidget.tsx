import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import { ContactWidgetProps } from '@src/interfaces/ContactWidget';
import Button from '@src/shared/ui/Button';
import SectionHeading from '@src/shared/ui/SectionHeading';
import { tokens } from '@src/shared/theme/tokens';

const Wrapper = styled.section`
  width: min(1200px, 100%);
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 1.25rem;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: ${tokens.radius.xl};
  background: ${tokens.gradient.surface};
  border: 1px solid ${tokens.color.border};
  box-shadow: ${tokens.shadow.card};
`;

const Popup = styled.div<{ $success: boolean }>`
  position: sticky;
  top: 86px;
  z-index: 3;
  width: fit-content;
  margin: 0 0 1rem auto;
  padding: 0.8rem 1rem;
  border-radius: ${tokens.radius.md};
  background: ${({ $success }) =>
    $success ? 'rgba(31, 169, 113, 0.12)' : 'rgba(220, 79, 106, 0.12)'};
  border: 1px solid
    ${({ $success }) =>
      $success ? 'rgba(31, 169, 113, 0.22)' : 'rgba(220, 79, 106, 0.22)'};
  color: ${({ $success }) =>
    $success ? tokens.color.success : tokens.color.danger};
  font-weight: 700;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;

  label {
    color: ${tokens.color.ink};
    font-size: 0.92rem;
    font-weight: 700;
  }
`;

const fieldStyles = `
  width: 100%;
  min-height: 54px;
  padding: 0.95rem 1rem;
  border-radius: ${tokens.radius.md};
  border: 1px solid ${tokens.color.border};
  background: ${tokens.color.surface};
  color: ${tokens.color.ink};
  font: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${tokens.color.brand};
    box-shadow: 0 0 0 4px rgba(17, 126, 255, 0.14);
  }
`;

const Input = styled.input`
  ${fieldStyles}
`;

const TextArea = styled.textarea`
  ${fieldStyles}
  min-height: 160px;
  resize: vertical;
`;

const InfoLabel = styled.p`
  margin: 0;
  color: ${tokens.color.brandDark};
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const InfoTitle = styled.h3`
  margin: 0.75rem 0 0;
  color: ${tokens.color.ink};
  font-size: 1.7rem;
`;

const InfoCopy = styled.p`
  margin: 0.9rem 0 0;
  color: ${tokens.color.inkMuted};
  line-height: 1.8;
`;

const InfoList = styled.div`
  display: grid;
  gap: 0.85rem;
  margin-top: 1.5rem;
`;

const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 0.9rem;
  align-items: start;
  padding: 1rem;
  border-radius: ${tokens.radius.lg};
  background: ${tokens.color.surfaceMuted};
  border: 1px solid rgba(13, 27, 51, 0.08);
`;

const IconWrap = styled.span`
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: rgba(17, 126, 255, 0.1);
  color: ${tokens.color.brand};
  font-size: 1.2rem;
`;

const InfoHeading = styled.h4`
  margin: 0;
  color: ${tokens.color.ink};
  font-size: 1rem;
`;

const InfoValue = styled.div`
  margin-top: 0.4rem;
  color: ${tokens.color.inkMuted};
  line-height: 1.7;

  p {
    margin: 0;
  }
`;

const ContactWidget: React.FC<ContactWidgetProps> = ({
  title,
  submitTitle,
  introEyebrow,
  introSubtitle,
  sidebarEyebrow,
  sidebarTitle,
  sidebarDescription,
  successMessage,
  errorMessage,
  unconfiguredMessage,
  formFields,
  contactInfo,
  emailConfig,
  externalApiUrl,
  setLoading,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupStatus, setPopupStatus] = useState<boolean | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    const updatedData = { ...formData, [id]: value };

    setFormData(updatedData);
    validateForm(updatedData);
  };

  const validateForm = (data: Record<string, string>) => {
    const isValid = formFields.every(
      (field) => !field.required || (data[field.id]?.trim() || '').length > 0
    );
    setIsFormValid(isValid);
  };

  const setTransientMessage = (message: string, status: boolean) => {
    setPopupMessage(message);
    setPopupStatus(status);
    window.setTimeout(() => setPopupMessage(null), 5000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading?.(true);

    try {
      if (emailConfig) {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          formData,
          emailConfig.userId
        );
        setTransientMessage(
          successMessage || 'Thank you. Your message has been sent.',
          true
        );
      } else if (externalApiUrl) {
        const response = await fetch(externalApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        if (response.ok) {
          setTransientMessage(
            successMessage || 'Thank you. Your message has been sent.',
            true
          );
        } else {
          setTransientMessage(
            `Request failed: ${responseData.message || 'An error occurred.'}`,
            false
          );
        }
      } else {
        setTransientMessage(
          unconfiguredMessage || 'Contact delivery is not configured yet.',
          false
        );
        return;
      }

      setFormData({});
      setIsFormValid(false);
    } catch (error) {
      console.error('Error during submission:', error);
      setTransientMessage(
        errorMessage || 'Something went wrong. Please try again.',
        false
      );
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <Wrapper>
      {popupMessage && popupStatus !== null ? (
        <Popup $success={popupStatus}>{popupMessage}</Popup>
      ) : null}

      <Grid>
        <Panel>
          <SectionHeading
            eyebrow={introEyebrow || "Let's build"}
            title={title}
            subtitle={
              introSubtitle ||
              "Tell me about the product, portfolio, or platform you want to improve. I'm especially interested in React frontends, .NET APIs, dashboards, and migration work."
            }
          />

          <Form onSubmit={handleSubmit}>
            <FieldGrid>
              {formFields.map((field) => {
                const isTextArea = field.type === 'textarea';

                return (
                  <FormGroup key={field.id} as={isTextArea ? FullWidth : 'div'}>
                    <label htmlFor={field.id}>{field.label}</label>
                    {isTextArea ? (
                      <TextArea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={handleChange}
                        required={field.required}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={handleChange}
                        required={field.required}
                      />
                    )}
                  </FormGroup>
                );
              })}
            </FieldGrid>

            <Button type="submit" disabled={!isFormValid}>
              {submitTitle}
            </Button>
          </Form>
        </Panel>

        <Panel>
          <InfoLabel>{sidebarEyebrow || 'Direct contact'}</InfoLabel>
          <InfoTitle>{sidebarTitle || 'Prefer to connect the simple way?'}</InfoTitle>
          <InfoCopy>
            {sidebarDescription ||
              "Reach out for full-stack product work, UI modernization, micro-frontends, or performance improvements. I'm happy to discuss architecture, delivery, and implementation details."}
          </InfoCopy>

          <InfoList>
            {contactInfo.map((info, index) => (
              <InfoItem key={index}>
                <IconWrap>{info.icon}</IconWrap>
                <div>
                  <InfoHeading>{info.label}</InfoHeading>
                  <InfoValue>
                    {typeof info.value === 'string' ? <p>{info.value}</p> : info.value}
                  </InfoValue>
                </div>
              </InfoItem>
            ))}
          </InfoList>
        </Panel>
      </Grid>
    </Wrapper>
  );
};

export default ContactWidget;
