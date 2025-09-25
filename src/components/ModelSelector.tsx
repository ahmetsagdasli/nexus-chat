import { useState, useEffect } from 'react';
import { AIModel, AVAILABLE_MODELS } from '../types';

interface ModelSelectorProps {
  currentModel: AIModel;
  onModelChange: (model: AIModel) => void;
  isUsingRealAI: boolean;
}

export const ModelSelector = ({ currentModel, onModelChange, isUsingRealAI }: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = (model: AIModel) => {
    console.log('Selecting model:', model); // Debug log
    onModelChange(model);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if (!isUsingRealAI) {
    return null; // Don't show model selector for simulated AI
  }

  return (
    <div className="model-selector" onClick={(e) => e.stopPropagation()}>
      <button
        className="model-selector-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title="Select AI Model"
      >
        <span className="model-name">{AVAILABLE_MODELS[currentModel].name}</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
          <div className="model-dropdown">
            {Object.entries(AVAILABLE_MODELS).map(([modelKey, modelInfo]) => (
              <button
                key={modelKey}
                className={`model-option ${currentModel === modelKey ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleModelSelect(modelKey as AIModel);
                }}
              >
                <div className="model-option-name">{modelInfo.name}</div>
                <div className="model-option-description">{modelInfo.description}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};