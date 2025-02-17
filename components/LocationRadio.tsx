interface LocationRadioProps {
  errorMsg: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LocationRadio({
  errorMsg,
  onChange,
}: LocationRadioProps) {
  const locations = [
    "New York",
    "San Francisco",
    "Seattle",
    "Chicago",
    "Boston",
    "Portland",
  ];

  return (
    <div className="formData">
      <label>À quelle ville souhaitez-vous participer ?</label>
      <div className="radio-buttons">
        {locations.map((location, index) => (
          <div key={location}>
            <input
              className="checkbox-input"
              type="radio"
              id={`location${index + 1}`}
              name="location"
              value={location}
              onChange={onChange}
            />
            <label className="checkbox-label" htmlFor={`location${index + 1}`}>
              <span className="checkbox-icon"></span>
              {location}
            </label>
          </div>
        ))}
      </div>
      <span className="error-msg">{errorMsg}</span>
    </div>
  );
}
