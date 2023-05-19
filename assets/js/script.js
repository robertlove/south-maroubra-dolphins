---
layout: null
---

{% include_relative bootstrap.bundle.min.js %}

const events = [{% for event in site.data.events %}
  {
    date: "{{- event.date -}}",
    date_display: "{{- event.date | date: site.date_format -}}",
    description: {% if event.description %}"{{- event.description | escape -}}"{% else %}null{% endif %},
    location: "{{- event.location.name | escape -}}",
    url: "{{- '/events' | relative_url -}}#{{- event.date | date: '%F' -}}"
  }{% unless forloop.last %},{% endunless %}
{% endfor %}];

const nextEvent = document.getElementById('next-event');
if (nextEvent) {
  const now = Date.now();
  let html = 'There are no upcoming events at this time.';
  for (const i in events) {
    let event = events[i];
    let date = Date.parse(event.date);
    if (date >= now) {
      text = '';
      if (event.description) {
        text = `${event.description} on `;
      }
      text += `${event.date_display} at ${event.location}`;
      html = `<a href="${event.url}" class="text-reset">${text}</a>`;
      document.getElementById('next-event').innerHTML = html;
      break;
    }
  }
}