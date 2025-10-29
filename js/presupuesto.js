document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('presupuestoForm');
    const totalEl = document.getElementById('total');

    const preciosServicios = {
        domicilio: 20,
        oficina: 35,
        comercial: 50,
        industrial: 75
    };

    const preciosExtras = {
        urgencia: 10,
        materialesPremium: 15,
        transporte: 5
    };

    function calcularTotal() {
        let total = 0;
        const servicio = form.servicio.value;
        if(preciosServicios[servicio]) total += preciosServicios[servicio];

        form.querySelectorAll('input[name="extras"]:checked').forEach(extra => {
            total += preciosExtras[extra.value];
        });

        totalEl.textContent = total + '€';
    }

    form.addEventListener('change', calcularTotal);
    form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Presupuesto enviado correctamente.');
        form.reset();
        calcularTotal();
    });

    calcularTotal();
});
