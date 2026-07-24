import { useFormikContext } from "formik";
import { useEffect } from "react";

const ScrollToError = () => {
  const { errors, submitCount, isSubmitting } = useFormikContext();

  useEffect(() => {
    if (submitCount > 0 && !isSubmitting) {
      const firstError = Object.keys(errors)[0];

      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          setTimeout(() => {
            element.focus();
          }, 300);
        }
      }
    }
  }, [errors, submitCount, isSubmitting]);

  return null;
};

export default ScrollToError;
