import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";

const FormArea = () => {
    
const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [fileName, setFileName] = useState("no file chosen");
  const [errors, setErrors] = useState({ name: false, email: false, resume: false });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    
    // File input
    if (name === "resume" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file ? file.name : "no file chosen");
      setErrors((prev) => ({ ...prev, resume: false }));
    } else {
      // Text input
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: value.trim() === "" })); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      resume: formData.resume === null,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.warn("Validation failed:", newErrors);
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("resume", formData.resume);

    try {
      const response = await axios.post("http://localhost:54321/apply-job", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response.data);
      setIsSubmitted(true);

      // Reset form after successful submission
      setFormData({ name: "", email: "", resume: null });
      setFileName("no file chosen");
      setErrors({ name: false, email: false, resume: false });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload or send email!");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <img src="/assets/img/apply-job/apply.png" alt="job" width={350} height={250} className={styles.center} />
                <h1 className={styles.title}>Apply for a job or internship</h1>
                <p className={styles.requiredFields}><span className={styles.redAsterisk}>*</span>Required fields or they will not be considered.</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.formLabel}> First Name and Last Name<span className={styles.redAsterisk}>*</span>: </label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your first name and last name"
                    className={`${styles.formInput} ${errors.name ? styles.inputError : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.formLabel}> Email<span className={styles.redAsterisk}>*</span>: </label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@email.com"
                    className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                
                <div className={styles.fileUploadGroup}>
                    <div className={styles.formLabel}>
                    Upload CV Resume Portfolio<span className={styles.redAsterisk}>*</span>: (Only PDF File)
                    </div>
                    <div className={styles.fileUpload}>
                    <label htmlFor="resume" className={styles.uploadButton}>
                        Upload file
                    </label>
                    <input
                        type="file"
                        name="resume"
                        id="resume"
                        accept=".pdf"
                        className={`${styles.hiddenInput}`}
                        onChange={handleChange}
                    />
                    <span id="fileName" className={`${styles.fileName} ${errors.resume ? styles.textError : ""}`}>{fileName}</span>
                    </div>
                </div>

                <button className={styles.submitButton} type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Apply Now"}
                </button>
                </form>

                {loading && <div className={styles.loaderContainer}><div className={styles.loader}></div></div>}

                {isSubmitted && (
                <div className={styles.overlay}>
                    <div className={styles.thankYouPopup}>
                    <h2>Thank You!</h2>
                    <p>Your resume has been submitted successfully.</p>
                    <button onClick={() => setIsSubmitted(false)} className={styles.closeButton}>Close</button>
                    </div>
                </div>
                )}
            </div>
        </div>
        </>
    );
};

export default FormArea;