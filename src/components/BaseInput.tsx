// import { ComponentPropsWithoutRef } from "react";

// type InputComomProps = ComponentPropsWithoutRef<"div"> & {
//   textLabel: string;
//   textPlaceholder: string;
//   name: string,
//   value: string,
//   type: string,
//   formik: any
// };

// const BaseInput = ({ textLabel, textPlaceholder, name, value, formik, type = 'text'}: InputComomProps) => {
//   return (
//     <div>
//       <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
//         {textLabel}
//       </label>
//       <input
//         type={type}
//         name={name}
//         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder={textPlaceholder}
//         required
//         value={formik.values[name]}
//         onBlur={formik.handleBlur}
//         onChange={formik.handleChange}
//       />
//     </div>
//   );
// };

// export default BaseInput
