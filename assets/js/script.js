---
layout: null
---

const events = [{% for event in site.data.events %}
  {
    date: "{{- event.date | date: site.date_format -}}",
    datetime: "{{- event.date | date: '%FT%T.%L%z' -}}",
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
      let datetime = Date.parse(event.datetime);

      if (datetime >= now) {

        text = '';

        if (event.description) {
          text = `${event.description} on `;
        }

        text += `${event.date} at ${event.location}`;
        html = `<a href="${event.url}" class="text-reset fs-6">${text}</a>`;
        nextEvent.innerHTML = html;
        break;

      }
    }
  }