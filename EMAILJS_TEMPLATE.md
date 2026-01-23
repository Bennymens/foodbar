# EmailJS Template Configuration

## Template ID: `template_vcu9y0l`

### Required Template Variables

Your EmailJS email template should include these variables to capture all form data:

```
From: {{name}} <{{email}}>
Phone: {{phone}}
Subject: {{subject}}

Inquiry Type: {{inquiry_type}}

Event Type: {{event_type}}
Event Date & Time: {{event_date}}

Message:
{{message}}
```

### Template HTML Example

```html
<h2>New Contact Form Submission</h2>

<p><strong>From:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Subject:</strong> {{subject}}</p>

<p><strong>Inquiry Type:</strong> {{inquiry_type}}</p>

{{#if event_type}}
<p><strong>Event Type:</strong> {{event_type}}</p>
{{/if}} {{#if event_date}}
<p><strong>Event Date:</strong> {{event_date}}</p>
{{/if}}

<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

### Form Fields Mapping

| Form Field Name | EmailJS Variable   | Purpose                                             |
| --------------- | ------------------ | --------------------------------------------------- |
| `name`          | `{{name}}`         | Customer's name                                     |
| `email`         | `{{email}}`        | Customer's email                                    |
| `phone`         | `{{phone}}`        | Customer's phone number                             |
| `subject`       | `{{subject}}`      | Email subject/inquiry topic                         |
| `inquiry_type`  | `{{inquiry_type}}` | Type: general/order/event/bulk                      |
| `event_type`    | `{{event_type}}`   | Event category (weddings, parties, etc.) - Optional |
| `event_date`    | `{{event_date}}`   | Event date/time - Optional                          |
| `message`       | `{{message}}`      | Customer's message                                  |

### Notes

- All form fields are automatically sent by `emailjs.sendForm()`
- Event-related fields (`event_type`, `event_date`) are only visible when inquiry_type = "event"
- Use conditional blocks `{{#if field}}` to only show event fields when they have values
- The template will receive empty strings for hidden fields

### Testing

After updating your template:

1. Submit a general inquiry (event fields should be empty/not displayed)
2. Submit an event booking (all fields including event_type and event_date should appear)
3. Check that all data appears correctly in received emails
