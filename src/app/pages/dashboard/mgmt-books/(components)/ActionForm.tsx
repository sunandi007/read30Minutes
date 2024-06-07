"use client";
import React, { useState } from "react";
import TextEditor from "../../../../ui/TextEditor";
import { Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

interface Props {
  formData: any;
  handleActionChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
    index: number,
    nameField?: string
  ) => void;
  addActionField: () => void;
  removeActionField: (index: number) => void;
}

const ActionsForm: React.FC<Props> = ({
  formData,
  handleActionChange,
  addActionField,
  removeActionField,
}) => {
  return (
    <div>
      {formData.actions.map((action: any, index: number) => (
        <>
          <div key={index}>
            <div className="flex justify-between h-fit mb-2 items-center">
              <h2 className="text-lg font-semibold">Action {index + 1}</h2>
              <Button
                size="sm"
                color="gray"
                type="button"
                onClick={() => removeActionField(index)}
              >
                <HiTrash />
              </Button>
            </div>
            <div>
              <label htmlFor={`actionTitle-${index}`} className="block mb-1">
                Title:
              </label>
              <input
                type="text"
                id={`actionTitle-${index}`}
                name="actionTitle"
                value={action.actionTitle}
                onChange={(e) => handleActionChange(e, index)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor={`quote-${index}`} className="block mb-1">
                Quote:
              </label>
              <input
                type="text"
                id={`quote-${index}`}
                name="quote"
                value={action.quote}
                onChange={(e) => handleActionChange(e, index)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-20">
              <label htmlFor={`content-${index}`} className="block mb-1">
                Content:
              </label>
              <React.StrictMode>
                <TextEditor
                  name="content"
                  onChange={(content: any) =>
                    handleActionChange(content, index, "content")
                  }
                />
              </React.StrictMode>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ActionsForm;
