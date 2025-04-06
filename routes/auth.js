<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - EventSphere</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        :root { --primary-blue: #00c4cc; --primary-purple: #a100b2; --bg-dark: radial-gradient(circle at top, #1a252e 0%, #0f172a 70%, #0a101b 100%); }
        body { background: var(--bg-dark); font-family: 'Poppins', sans-serif; min-height: 100vh; color: #e5e7eb; position: relative; }
        .navbar { background: rgba(10, 16, 27, 0.9); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); z-index: 20; }
        .form-container {
            background: rgba(15, 23, 42, 0.9); border: 1px solid var(--primary-blue); border-radius: 1rem;
            box-shadow: 0 2px 10px rgba(0, 196, 204, 0.2); padding: 1.5rem; max-width: 500px; width: 100%;
            margin: 0 auto;
        }
        .form-input { background: rgba(31, 41, 55, 0.9); border: 1px solid var(--primary-blue); color: #e5e7eb; border-radius: 0.5rem; }
        .submit-btn {
            background: linear-gradient(90deg, #22c55e, #06b6d4); color: #fff; font-weight: 600;
            transition: transform 0.3s ease; border-radius: 0.5rem;
        }
        .submit-btn:hover { transform: translateY(-2px); }
        .delete-btn {
            background: linear-gradient(90deg, #ef4444, #dc2626); color: #fff; font-weight: 600;
            transition: transform 0.3s ease; border-radius: 0.5rem;
        }
        .delete-btn:hover { transform: translateY(-2px); }
        .event-card {
            background: rgba(15, 23, 42, 0.9); border: 1px solid var(--primary-blue); border-radius: 1rem;
            padding: 1rem; transition: box-shadow 0.3s ease;
        }
        .event-card:hover { box-shadow: 0 5px 15px rgba(0, 196, 204, 0.3); }
        #analytics { background: rgba(31, 41, 55, 0.9); border-radius: 1rem; padding: 1rem; margin-top: 1rem; }
        .toggle-slider {
            width: 60px; height: 30px; background: #4b5563; border-radius: 15px; cursor: pointer;
            position: fixed; top: 20px; right: 20px; transition: background 0.3s;
        }
        .toggle-slider::before {
            content: '☾'; width: 26px; height: 26px; background: #fff; border-radius: 50%;
            top: 2px; left: 2px; transition: left 0.3s; display: flex; align-items: center; justify-content: center;
        }
        body.light-mode .toggle-slider::before { content: '☀'; left: 32px; }
        body.light-mode { background: #f0f8fa; color: #333; }
        body.light-mode .form-container, body.light-mode .event-card, body.light-mode #analytics { background: rgba(240, 248, 250, 0.9); }
        body.light-mode .form-input { background: #fff; color: #333; }
    </style>
</head>
<body class="relative">
    <nav class="navbar fixed top-0 w-full py-4">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <a href="admin.html" class="text-2xl font-bold text-white">EventSphere Admin</a>
            <div class="space-x-6">
                <a href="events.html" class="text-lg font-medium text-white hover:text-primary-blue">View Events</a>
                <a href="#" id="logout" class="text-lg font-medium text-white hover:text-primary-blue">Logout</a>
            </div>
        </div>
    </nav>
    <div class="toggle-slider" id="theme-toggle"></div>
    <div class="container mx-auto px-4 pt-24 pb-8 z-10">
        <div class="form-container mb-6">
            <h2 class="text-2xl font-bold text-center mb-4">Add Event</h2>
            <form id="event-form" enctype="multipart/form-data">
                <div class="mb-3"><label class="block text-sm font-medium mb-1">Event Name</label><input type="text" id="event-name" class="form-input w-full p-2" placeholder="Enter event name" required></div>
                <div class="mb-3"><label class="block text-sm font-medium mb-1">Event Date</label><input type="date" id="event-date" class="form-input w-full p-2" required></div>
                <div class="mb-3"><label class="block text-sm font-medium mb-1">Event Time</label><input type="time" id="event-time" class="form-input w-full p-2" placeholder="Enter event time" required></div>
                <div class="mb-3"><label class="block text-sm font-medium mb-1">Coordinator Name</label><input type="text" id="coordinator-name" class="form-input w-full p-2" placeholder="Enter coordinator name" required></div>
                <div class="mb-3"><label class="block text-sm font-medium mb-1">Coordinator Contact</label><input type="tel" id="coordinator-contact" class="form-input w-full p-2" placeholder="Enter coordinator contact" pattern="[0-9]{10}" required></div>
                <div class="mb-3"><label class="block text-sm font-medium mb-1">Poster URL</label><input type="url" id="event-poster" class="form-input w-full p-2" placeholder="Enter poster image URL" required></div>
                <div class="mb-3"><label class="block text-sm font-medium mb-1">PhonePe Screenshot</label><input type="file" name="phonepe-screenshot" id="phonepe-screenshot" class="form-input w-full p-2" accept="image/*" required></div>
                <div class="mb-4"><label class="block text-sm font-medium mb-1">WhatsApp Group Link</label><input type="url" id="whatsapp-link" class="form-input w-full p-2" placeholder="Enter WhatsApp group link" required></div>
                <button type="submit" class="submit-btn w-full py-2">Add Event</button>
            </form>
        </div>
        <div class="mt-6">
            <h2 class="text-2xl font-bold text-center mb-4">Manage Events</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="event-grid"></div>
        </div>
        <div class="mt-6">
            <h2 class="text-2xl font-bold text-center mb-4">Analytics</h2>
            <div id="analytics">
                <p>Total Events: <span id="total-events">0</span></p>
                <p>Total Registrations: <span id="total-registrations">0</span></p>
            </div>
        </div>
    </div>
    <script>
        if (!localStorage.getItem('isLoggedIn')) window.location.href = '/admin-login.html'; // Relative path
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault(); 
            localStorage.removeItem('isLoggedIn'); 
            window.location.href = '/admin-login.html'; // Relative path
        });

        const eventGrid = document.getElementById('event-grid');
        const totalEvents = document.getElementById('total-events');
        const totalRegistrations = document.getElementById('total-registrations');

        async function fetchEvents() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('No token found. Please log in.');
                    return;
                }
                const response = await fetch('https://event-sphere.onrender.com/api/events', { // Replace with your Render URL after deployment
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch events');
                const events = await response.json();
                renderEvents(events);
                updateAnalytics();
            } catch (error) {
                console.error('Fetch error:', error);
                eventGrid.innerHTML = '<p class="text-center col-span-full text-red-500">Error loading events.</p>';
            }
        }

        function renderEvents(events) {
            eventGrid.innerHTML = '';
            if (events.length === 0) {
                eventGrid.innerHTML = '<p class="text-center col-span-full text-gray-500">No events available.</p>';
                return;
            }
            events.forEach((event) => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <h3 class="text-lg font-semibold mb-2">${event.name}</h3>
                    <p class="mb-1 text-gray-500">Date: ${new Date(event.date).toLocaleDateString()}</p>
                    <p class="mb-1 text-gray-500">Time: ${event.time || 'N/A'}</p>
                    <p class="mb-1 text-gray-500">Coordinator: ${event.coordinatorName}</p>
                    <p class="mb-1 text-gray-500">Contact: ${event.coordinatorContact}</p>
                    <button class="delete-btn w-full py-2 mt-3" data-id="${event._id}">Delete</button>
                `;
                eventGrid.appendChild(card);
            });
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async () => {
                    if (confirm('Are you sure you want to delete this event?')) {
                        const id = button.getAttribute('data-id');
                        const token = localStorage.getItem('token');
                        const response = await fetch(`https://event-sphere.onrender.com/api/events/${id}`, { // Replace with your Render URL after deployment
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                            alert('Event deleted successfully!');
                            fetchEvents();
                        } else {
                            alert('Failed to delete event');
                        }
                    }
                });
            });
        }

        async function updateAnalytics() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('No token found. Please log in.');
                    return;
                }
                const response = await fetch('https://event-sphere.onrender.com/api/events/analytics', { // Replace with your Render URL after deployment
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch analytics');
                const { totalEvents, totalRegistrations } = await response.json();
                totalEvents.textContent = totalEvents;
                totalRegistrations.textContent = totalRegistrations;
            } catch (error) {
                console.error('Analytics error:', error);
                totalEvents.textContent = 'Error';
                totalRegistrations.textContent = 'Error';
            }
        }

        document.getElementById('event-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name', document.getElementById('event-name').value);
            formData.append('date', document.getElementById('event-date').value);
            formData.append('time', document.getElementById('event-time').value);
            formData.append('coordinatorName', document.getElementById('coordinator-name').value);
            formData.append('coordinatorContact', document.getElementById('coordinator-contact').value);
            formData.append('poster', document.getElementById('event-poster').value);
            formData.append('whatsappLink', document.getElementById('whatsapp-link').value);
            formData.append('phonepe-screenshot', document.getElementById('phonepe-screenshot').files[0]);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('No token found. Please log in.');
                    return;
                }
                const response = await fetch('https://event-sphere.onrender.com/api/events', { // Replace with your Render URL after deployment
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                });
                if (!response.ok) throw new Error('Failed to add event');
                const data = await response.json();
                alert('Event added successfully!');
                document.getElementById('event-form').reset();
                fetchEvents();
                updateAnalytics();
            } catch (error) {
                console.error('Submit error:', error);
                alert('Error adding event: ' + error.message);
            }
        });

        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
        if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');

        // Initial fetch
        fetchEvents();
        updateAnalytics();
    </script>
</body>
</html>
