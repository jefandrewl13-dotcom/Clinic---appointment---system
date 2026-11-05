
// ==============================
// MODEL
// Stores data and validation rules
// ==============================

const AppointmentModel = {

    getPatientData: function() {
        return {
            fullname: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            age: document.getElementById("age").value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || "",
            doctor: document.getElementById("doctor").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            reason: document.getElementById("reason").value.trim(),
            confirm: document.getElementById("confirm").checked
        };
    },

    validate: function(data) {
        let errors = [];

        if (data.fullname.length < 3) {
            errors.push("Full name must contain at least 3 characters.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push("Please enter a valid email address.");
        }

        if (!/^09[0-9]{9}$/.test(data.phone)) {
            errors.push("Contact number must be 11 digits starting with 09.");
        }

        if (data.age < 1 || data.age > 120 || data.age === "") {
            errors.push("Please enter a valid age.");
        }

        if (!data.gender) {
            errors.push("Please select your gender.");
        }

        if (!data.doctor) {
            errors.push("Please select a doctor.");
        }

        if (!data.date) {
            errors.push("Please select an appointment date.");
        } else {
            const selectedDate = new Date(data.date + "T00:00:00");
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                errors.push("Appointment date cannot be in the past.");
            }
        }

        if (!data.time) {
            errors.push("Please select an appointment time.");
        }

        if (data.reason.length < 5) {
            errors.push("Please provide a reason with at least 5 characters.");
        }

        if (!data.confirm) {
            errors.push("Please confirm your information.");
        }

        return errors;
    }
};


// ==============================
// VIEW
// Displays messages to the user
// ==============================

const AppointmentView = {

    showMessage: function(message, type) {
        const messageBox = document.getElementById("message");

        messageBox.textContent = message;
        messageBox.style.color =
            type === "success" ? "green" : "red";
    },

    showFieldMessage: function(elementId, message) {
        let element = document.getElementById(elementId);

        element.style.borderColor = message ? "red" : "#087f8c";
    }
};


// ==============================
// CONTROLLER
// Handles user events
// ==============================

const AppointmentController = {

    init: function() {

        const form = document.getElementById("appointmentForm");
        const name = document.getElementById("fullname");
        const email = document.getElementById("email");
        const doctor = document.getElementById("doctor");
        const message = document.getElementById("message");

        // Event 1: Check name while typing
        name.addEventListener("input", function() {

            if (name.value.trim().length < 3) {
                AppointmentView.showFieldMessage(
                    "fullname", "Invalid name"
                );
            } else {
                AppointmentView.showFieldMessage(
                    "fullname", ""
                );
            }
        });

        // Event 2: Validate email when leaving the field
        email.addEventListener("blur", function() {

            if (!email.validity.valid || email.value.trim() === "") {
                AppointmentView.showFieldMessage(
                    "email", "Invalid email"
                );
            } else {
                AppointmentView.showFieldMessage(
                    "email", ""
                );
            }
        });

        // Event 3: Detect doctor selection
        doctor.addEventListener("change", function() {

            if (doctor.value) {
                AppointmentView.showMessage(
                    "Selected doctor: " + doctor.value,
                    "success"
                );
            }
        });

        // Event 4: Submit appointment
        form.addEventListener("submit", function(event) {

            event.preventDefault();

            const data = AppointmentModel.getPatientData();
            const errors = AppointmentModel.validate(data);

            if (errors.length > 0) {
                AppointmentView.showMessage(
                    errors[0],
                    "error"
                );
                return;
            }

            AppointmentView.showMessage(
                "Appointment request submitted successfully!",
                "success"
            );

            console.log("Appointment Information:", data);
        });

        // Event 5: Clear messages after resetting
        form.addEventListener("reset", function() {

            setTimeout(function() {
                message.textContent = "";
                name.style.borderColor = "#ccc";
                email.style.borderColor = "#ccc";
            }, 0);

        });
    }
};


// Start the application
document.addEventListener("DOMContentLoaded", function() {
    AppointmentController.init();
});
      
