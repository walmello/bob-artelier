<script>
    const { label, type = 'text' } = $props()
</script>

<label for="">
    {label} <br>
    <input type={type}>
</label>