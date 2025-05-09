// app/voter-management/add-new-voter/page.jsx
"use client";
import { useState } from "react";

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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        suppressHydrationWarning={true}
        className={`w-full p-2 border rounded bg-gray-700 text-white border-gray-600 ${
          formSubmitted && errors[name] ? "border-red-500" : ""
        }`}
      />
      {formSubmitted && errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  if (formSuccess) {
    return (
      <div className="text-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="mb-6 border-b border-gray-700 pb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Add Voter</h1>
            </div>
            <div className="mb-6">
              <div className="flex border-b border-gray-700">
                <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-500">Voter Details</button>
                <button className="py-2 px-4 text-gray-400">Constituency Details</button>
                <button className="py-2 px-4 text-gray-400">Family Details</button>
                <button className="py-2 px-4 text-gray-400">Employment</button>
              </div>
            </div>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
              <p>Voter details saved successfully.</p>
            </div>
            <div className="text-center my-12">
              <p className="text-lg">Voter details have been saved. You can now proceed to the Constituency Details section.</p>
              <button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                suppressHydrationWarning={true}
                onClick={() => console.log("Navigate to Constituency Details page")}
              >
                Continue to Constituency Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="mb-6 border-b border-gray-700 pb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Add Voter</h1>
          </div>
          <div className="mb-6">
            <div className="flex border-b border-gray-700">
              <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-500">Voter Details</button>
              <button className="py-2 px-4 text-gray-400">Constituency Details</button>
              <button className="py-2 px-4 text-gray-400">Family Details</button>
              <button className="py-2 px-4 text-gray-400">Employment</button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Voter Card No.</h2>
              {renderInputWithLabel("Voter Card No", "voterCardNo", "Enter Voter Card No", true)}
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Voter Data</h2>
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
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Relation Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderInputWithLabel("First Name", "relFirstName", "Enter First Name")}
                {renderInputWithLabel("Middle Name", "relMiddleName", "Enter Middle Name")}
                {renderInputWithLabel("Last Name", "relLastName", "Enter Last Name")}
                {renderInputWithLabel("Full Name", "relFullName", "Enter Full Name")}
                {renderInputWithLabel("", "relFirstNameHindi", "पहला नाम दर्ज करें")}
                {renderInputWithLabel("", "relMiddleNameHindi", "मध्य नाम दर्ज करें")}
                {renderInputWithLabel("", "relLastNameHindi", "अंतिम नाम दर्ज करें")}
                {renderInputWithLabel("", "relFullNameHindi", "पूरा नाम दर्ज करें")}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className={`w-full p-2 border rounded bg-gray-700 text-white border-gray-600 ${
                      formSubmitted && errors.dateOfBirth ? "border-red-500" : ""
                    }`}
                  />
                  {formSubmitted && errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-200 mb-1">Age</label>
                  <input
                    type="text"
                    value={calculateAge()}
                    disabled
                    suppressHydrationWarning={true}
                    className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-200 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {renderInputWithLabel("Mobile No", "mobileNo", "Enter Contact No", true)}
                {renderInputWithLabel("Alternative Mobile No", "alternativeMobileNo", "Enter Alternative Mobile No")}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-200 mb-1">Live Status</label>
                  <select
                    name="liveStatus"
                    value={formData.liveStatus}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-200 mb-1">Caste</label>
                  <select
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
                  >
                    <option value="General">General</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4 col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    rows="3"
                    suppressHydrationWarning={true}
                    className={`w-full p-2 border rounded bg-gray-700 text-white border-gray-600 ${
                      formSubmitted && errors.address ? "border-red-500" : ""
                    }`}
                  ></textarea>
                  {formSubmitted && errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>
                <div className="mb-4 col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200 mb-1">पता</label>
                  <textarea
                    name="addressHindi"
                    value={formData.addressHindi}
                    onChange={handleChange}
                    placeholder="पता दर्ज करें"
                    rows="3"
                    suppressHydrationWarning={true}
                    className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="py-2 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded"
                suppressHydrationWarning={true}
                onClick={() =>
                  setFormData({
                    ...formData,
                    ...Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: "" }), {}),
                  })
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded"
                suppressHydrationWarning={true}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}