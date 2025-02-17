"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "./FormInput";
import LocationRadio from "./LocationRadio";
import ConfirmationModal from "./ConfirmationModal";

interface RegistrationFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  quantity: string;
  location: string;
  terms: string;
}

export default function RegistrationForm({
  isModalOpen,
  setIsModalOpen,
}: RegistrationFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    quantity: "",
    location: "",
    terms: "",
  });

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.length < 2 ? "Veuillez entrer 2 caractères ou plus." : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Veuillez entrer une adresse email valide."
          : "";
      case "birthdate":
        if (!value) return "Veuillez entrer votre date de naissance.";
        const birthdate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        return age < 18 ? "Vous devez avoir au moins 18 ans." : "";
      case "quantity":
        return value === "" || parseInt(value) < 0
          ? "Veuillez entrer un nombre valide."
          : "";
      case "location":
        return value === "" ? "Veuillez sélectionner une ville." : "";
      case "terms":
        return value === "false"
          ? "Vous devez accepter les conditions d'utilisation."
          : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" || type === "radio"
        ? (e.target as HTMLInputElement).checked
        : undefined;

    const fieldValue = type === "checkbox" ? String(checked) : value;
    const error = validateField(name, fieldValue);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (form: HTMLFormElement): boolean => {
    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      birthdate: "",
      quantity: "",
      location: "",
      terms: "",
    };
    let isValid = true;

    // Validate First Name
    const firstName = form.firstName.value;
    if (firstName.length < 2) {
      newErrors.firstName = "Veuillez entrer 2 caractères ou plus.";
      isValid = false;
    }

    // Validate Last Name
    const lastName = form.lastName.value;
    if (lastName.length < 2) {
      newErrors.lastName = "Veuillez entrer 2 caractères ou plus.";
      isValid = false;
    }

    // Validate Email
    const email = form.email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Veuillez entrer une adresse email valide.";
      isValid = false;
    }

    // Validate Birthdate
    const birthdate = new Date(form.birthdate.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    if (!form.birthdate.value) {
      newErrors.birthdate = "Veuillez entrer votre date de naissance.";
      isValid = false;
    } else if (age < 18) {
      newErrors.birthdate = "Vous devez avoir au moins 18 ans.";
      isValid = false;
    }

    // Validate Quantity
    const quantity = form.quantity.value;
    if (quantity === "" || parseInt(quantity) < 0) {
      newErrors.quantity = "Veuillez entrer un nombre valide.";
      isValid = false;
    }

    // Validate Location
    const locationChecked = Array.from(
      form.querySelectorAll('input[name="location"]')
    ).some((input: Element) => (input as HTMLInputElement).checked);
    if (!locationChecked) {
      newErrors.location = "Veuillez sélectionner une ville.";
      isValid = false;
    }

    // Validate Terms
    if (!form.checkbox1.checked) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formFields = Array.from(form.elements) as HTMLInputElement[];
    const isValid = formFields.every((field) => {
      if (field.name) {
        const error = validateField(
          field.name,
          field.type === "checkbox" ? String(field.checked) : field.value
        );
        setErrors((prev) => ({ ...prev, [field.name]: error }));
        return !error;
      }
      return true;
    });

    if (isValid) {
      setShowConfirmation(true);
      form.reset();
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        quantity: "",
        location: "",
        terms: "",
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={`bground ${isModalOpen ? "active" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <span
                className="close"
                onClick={() => setIsModalOpen(false)}
              ></span>
              <div className="modal-body">
                <form
                  name="reserve"
                  id="formContainer"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <FormInput
                    id="firstName"
                    label="Prénom"
                    type="text"
                    errorMsg={errors.firstName}
                    onChange={handleChange}
                  />
                  <FormInput
                    id="lastName"
                    label="Nom"
                    type="text"
                    errorMsg={errors.lastName}
                    onChange={handleChange}
                  />
                  <FormInput
                    id="email"
                    label="E-mail"
                    type="email"
                    errorMsg={errors.email}
                    onChange={handleChange}
                  />
                  <FormInput
                    id="birthdate"
                    label="Date de naissance"
                    type="date"
                    errorMsg={errors.birthdate}
                    onChange={handleChange}
                  />
                  <FormInput
                    id="quantity"
                    label="À combien de tournois GameOn avez-vous déjà participé ?"
                    type="number"
                    errorMsg={errors.quantity}
                    min="0"
                    onChange={handleChange}
                  />
                  <LocationRadio
                    errorMsg={errors.location}
                    onChange={handleChange}
                  />

                  <div className="formData">
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      id="checkbox1"
                      onChange={handleChange}
                    />
                    <label className="checkbox2-label" htmlFor="checkbox1">
                      <span className="checkbox-icon"></span>
                      J'ai lu et accepté les conditions d'utilisation.
                    </label>
                    <span className="error-msg">{errors.terms}</span>

                    <input
                      className="checkbox-input"
                      type="checkbox"
                      id="checkbox2"
                      onChange={handleChange}
                    />
                    <label className="checkbox2-label" htmlFor="checkbox2">
                      <span className="checkbox-icon"></span>
                      Je souhaite être prévenu des prochains évènements.
                    </label>
                  </div>
                  <button className="button" type="submit">
                    C'est parti
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmation && (
          <ConfirmationModal
            onClose={() => {
              setShowConfirmation(false);
              setIsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
