import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import QualifiedBuyerForm from "./EditForms/QualifiedBuyerForm";
import IssuingRegistryForm from "./EditForms/IssuingRegistryForm";
import RelyingRegistryForm from "./EditForms/RelyingRegistryForm";
import SubmissionForm from "./EditForms/SubmissionForm";

const validationSchema = Yup.object({
  qbid: Yup.string().required("QBID is required"),

  institutionName: Yup.string().when("qbType", {
    is: "institutional",
    then: (schema) => schema.required("Institution Name is required"),
    otherwise: (schema) => schema,
  }),

  corControlNumber: Yup.string().required("Required"),

  dateOfRegistration: Yup.date().required("Required"),

  validityDate: Yup.date().required("Required"),

  qbStatus: Yup.string().required("Required"),
});

const EditRegistryModal = ({
  selectedItem,
  title,
  type,
  onSuccess,
  closeModal,
}) => {
  const [initialValues, setInitialValues] = useState({
    qbid: "",
    qbType: "",
    institutionName: "",
    qualifiedBuyers: [],
    corControlNumber: "",
    dateOfRegistration: "",
    validityDate: "",
    qbStatus: "",
  });

  useEffect(() => {
    if (!selectedItem) return;

    setInitialValues({
      qbid: selectedItem.qbid || "",
      qbType: selectedItem.qb_type?.toLowerCase() || "",
      institutionName:
        selectedItem.qb_type === "Institutional" ? selectedItem.qb_name : "",
      qualifiedBuyers:
        selectedItem.qb_type === "Individual" ? selectedItem.qb_name : [],
      corControlNumber: selectedItem.cor_control_number || "",
      dateOfRegistration: selectedItem.registration_date || "",
      validityDate: selectedItem.validity_period || "",
      qbStatus: selectedItem.qb_status || "",
    });
  }, [selectedItem]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        qb_name:
          values.qbType === "institutional"
            ? values.institutionName
            : values.qualifiedBuyers,
        registration_date: values.dateOfRegistration,
        cor_control_number: values.corControlNumber,
        validity_period: values.validityDate,
        qb_status: values.qbStatus,
      };

      await axios.put(
        `http://localhost:8080/qualified-buyers/${selectedItem.qbid}`,
        payload,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        },
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Qualified Buyer updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      const modal = Modal.getInstance(
        document.getElementById("editRegistryModal"),
      );

      modal?.hide();

      document.querySelectorAll(".modal-backdrop").forEach((e) => e.remove());

      document.body.classList.remove("modal-open");

      onSuccess();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Update failed.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal fade" id="editRegistryModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit {title}</h5>

            <button className="btn-close" data-bs-dismiss="modal" />
          </div>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              isSubmitting,
            }) => {
              const renderForm = () => {
                switch (type) {
                  case "qualifiedBuyer":
                    return (
                      <QualifiedBuyerForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    );

                  case "issuingRegistry":
                    return (
                      <IssuingRegistryForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    );

                  case "relyingRegistry":
                    return (
                      <RelyingRegistryForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                      />
                    );

                  case "submission":
                    return (
                      <SubmissionForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    );

                  default:
                    return null;
                }
              };

              return (
                <Form>
                  <div className="modal-body">{renderForm()}</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditRegistryModal;
