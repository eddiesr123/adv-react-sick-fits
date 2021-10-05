import { useState } from 'react';

const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);

  const handleChange = ({ target }) => {
    const { value, name, type, files } = target;

    const getValue = () => {
      if (type === 'number') {
        return parseFloat(value);
      }
      if (type === 'file') {
        return files[0];
      }
      return value;
    };

    setInputs((prevState) => ({
      ...prevState,
      [name]: getValue(),
    }));
  };

  const resetForm = (event) => {
    event.preventDefault();
    setInputs(initial);
  };

  const clearForm = (event) => {
    event.preventDefault();
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  };

  return { inputs, handleChange, resetForm, clearForm };
};

export default useForm;
