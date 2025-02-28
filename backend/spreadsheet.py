import statistics

def perform_operation(operation, range_cells):
    try:
        values = [float(cell) for cell in range_cells if isinstance(cell, (int, float))]
        
        if not values:
            return "No numeric values provided"

        operations = {
            'SUM': sum(values),
            'AVERAGE': sum(values) / len(values),
            'MAX': max(values),
            'MIN': min(values),
            'COUNT': len(values),
            'MEDIAN': statistics.median(values),
            'MODE': statistics.mode(values) if len(set(values)) > 1 else "No mode"
        }

        return operations.get(operation.upper(), "Unsupported operation")
    
    except Exception as e:
        return str(e)