// app/voter-management/add-new-voter/page.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ChevronRight, User, FileText, Home, Phone } from "lucide-react";

export default function VoterRegistrationForm() {
  const [formData, setFormData] = useState({
    voterCardNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fullName: "",
    firstNameHindi: "",
    middleNameHindi: "",
    lastNameHindi: "",
    fullNameHindi: "",
    relFirstName: "",
    relMiddleName: "",
    relLastName: "",
    relFullName: "",
    relFirstNameHindi: "",
    relMiddleNameHindi: "",
    relLastNameHindi: "",
    relFullNameHindi: "",
    dateOfBirth: "",
    gender: "Male",
    mobileNo: "",
    alternativeMobileNo: "",
    caste: "General",
    address: "",
    addressHindi: "",
    liveStatus: "Yes",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Compute English Full Name for Voter Data
    if (["firstName", "middleName", "lastName"].includes(name)) {
      const first = updatedFormData.firstName || "";
      const middle = updatedFormData.middleName || "";
      const last = updatedFormData.lastName || "";
      updatedFormData.fullName = `${first} ${middle} ${last}`.trim().replace(/\s+/g, " ");
    }

    // Compute Hindi Full Name for Voter Data
    if (["firstNameHindi", "middleNameHindi", "lastNameHindi"].includes(name)) {
      const firstHindi = updatedFormData.firstNameHindi || "";
      const middleHindi = updatedFormData.middleNameHindi || "";
      const lastHindi = updatedFormData.lastNameHindi || "";
      updatedFormData.fullNameHindi = `${firstHindi} ${middleHindi} ${lastHindi}`.trim().replace(/\s+/g, " ");
    }

    // Compute English Full Name for Relation Data
    if (["relFirstName", "relMiddleName", "relLastName"].includes(name)) {
      const relFirst = updatedFormData.relFirstName || "";
      const relMiddle = updatedFormData.relMiddleName || "";
      const relLast = updatedFormData.relLastName || "";
      updatedFormData.relFullName = `${relFirst} ${relMiddle} ${relLast}`.trim().replace(/\s+/g, " ");
    }

    // Compute Hindi Full Name for Relation Data
    if (["relFirstNameHindi", "relMiddleNameHindi", "relLastNameHindi"].includes(name)) {
      const relFirstHindi = updatedFormData.relFirstNameHindi || "";
      const relMiddleHindi = updatedFormData.relMiddleNameHindi || "";
      const relLastHindi = updatedFormData.relLastNameHindi || "";
      updatedFormData.relFullNameHindi = `${relFirstHindi} ${relMiddleHindi} ${relLastHindi}`.trim().replace(/\s+/g, " ");
    }

    setFormData(updatedFormData);

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["voterCardNo", "firstName", "lastName", "dateOfBirth", "mobileNo", "address"];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.mobileNo && !/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }

    if (formData.alternativeMobileNo && !/^\d{10}$/.test(formData.alternativeMobileNo)) {
      newErrors.alternativeMobileNo = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      setFormSuccess(true);
      console.log("Form submitted successfully:", formData);
    }
  };

  const calculateAge = () => {
    if (!formData.dateOfBirth) return "";
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const renderInputWithLabel = (label, name, placeholder, required = false, type = "text") => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-4"
    >
      <label className="block text-sm font-medium text-gray-600 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          suppressHydrationWarning={true}
          className={`w-full p-3 bg-white text-gray-800 rounded-lg border border-gray-200
            focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200
            placeholder:text-gray-400 shadow-sm
            ${formSubmitted && errors[name] ? "border-rose-500" : "group-hover:border-gray-300"}`}
        />
        {formSubmitted && errors[name] && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="text-rose-500" size={18} />
          </div>
        )}
      </div>
      {formSubmitted && errors[name] && (
        <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">
          <AlertCircle size={12} />
          {errors[name]}
        </p>
      )}
    </motion.div>
  );

  if (formSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-800 p-4 lg:p-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-bold text-gray-800">Add Voter</h1>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 text-green-600 p-4 mb-6 rounded-r-lg flex items-center gap-2">
              <CheckCircle2 size={20} />
              <p>Voter details saved successfully.</p>
            </div>
            <div className="text-center my-12">
              <p className="text-lg text-gray-600">Voter details have been saved. You can now proceed to the Constituency Details section.</p>
              <button
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium 
                  transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto shadow-sm hover:shadow-md"
                suppressHydrationWarning={true}
                onClick={() => console.log("Navigate to Constituency Details page")}
              >
                Continue to Constituency Details
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-gray-800 p-4 lg:p-6 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Add Voter</h1>
          </div>
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200">
              <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-500 font-medium">
                Voter Details
              </button>
              <button className="py-2 px-4 text-gray-400 hover:text-gray-600 transition-colors">
                Constituency Details
              </button>
              <button className="py-2 px-4 text-gray-400 hover:text-gray-600 transition-colors">
                Family Details
              </button>
              <button className="py-2 px-4 text-gray-400 hover:text-gray-600 transition-colors">
                Employment
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200"
            >
              <h2 className="text-lg font-medium mb-4 text-gray-800">Voter Card No.</h2>
              {renderInputWithLabel("Voter Card No", "voterCardNo", "Enter Voter Card No", true)}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200"
            >
              <h2 className="text-lg font-medium mb-4 text-gray-800">Voter Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderInputWithLabel("First Name", "firstName", "Enter First Name", true)}
                {renderInputWithLabel("Middle Name", "middleName", "Enter Middle Name")}
                {renderInputWithLabel("Last Name", "lastName", "Enter Last Name", true)}
                {renderInputWithLabel("Full Name", "fullName", "Enter Full Name")}
                {renderInputWithLabel("", "firstNameHindi", "पहला नाम दर्ज करें")}
                {renderInputWithLabel("", "middleNameHindi", "मध्य नाम दर्ज करें")}
                {renderInputWithLabel("", "lastNameHindi", "अंतिम नाम दर्ज करें")}
                {renderInputWithLabel("", "fullNameHindi", "पूरा नाम दर्ज करें")}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200"
            >
              <h2 className="text-lg font-medium mb-4 text-gray-800">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-full p-3 bg-white text-gray-800 rounded-lg border border-gray-200
                      focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200
                      shadow-sm hover:border-gray-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Age</label>
                  <input
                    type="text"
                    value={calculateAge()}
                    disabled
                    suppressHydrationWarning={true}
                    className="w-full p-3 bg-gray-50 text-gray-600 rounded-lg border border-gray-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-full p-3 bg-white text-gray-800 rounded-lg border border-gray-200
                      focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200
                      shadow-sm hover:border-gray-300"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {renderInputWithLabel("Mobile No", "mobileNo", "Enter Contact No", true)}
                {renderInputWithLabel("Alternative Mobile No", "alternativeMobileNo", "Enter Alternative Mobile No")}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Caste</label>
                  <select
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-full p-3 bg-white text-gray-800 rounded-lg border border-gray-200
                      focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200
                      shadow-sm hover:border-gray-300"
                  >
                    <option value="General">General</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200"
            >
              <h2 className="text-lg font-medium mb-4 text-gray-800">Address Details</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    rows="3"
                    suppressHydrationWarning={true}
                    className="w-full p-3 bg-white text-gray-800 rounded-lg border border-gray-200
                      focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200
                      shadow-sm hover:border-gray-300"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">पता</label>
                  <textarea
                    name="addressHindi"
                    value={formData.addressHindi}
                    onChange={handleChange}
                    placeholder="पता दर्ज करें"
                    rows="3"
                    suppressHydrationWarning={true}
                    className="w-full p-3 bg-white text-gray-800 rounded-lg border border-gray-200
                      focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200
                      shadow-sm hover:border-gray-300"
                  ></textarea>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
              <button
                type="button"
                className="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg 
                  transition-all duration-200 shadow-sm hover:shadow-md"
                suppressHydrationWarning={true}
                onClick={() => setFormData({
                  ...formData,
                  ...Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: "" }), {}),
                })}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                  transition-all duration-300 transform hover:scale-105 flex items-center gap-2
                  shadow-sm hover:shadow-md"
                suppressHydrationWarning={true}
              >
                Save
                <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}