import torch

def predict_trend(data):
    try:
        if not data or len(data) < 2:
            return "Insufficient data for prediction"

        x = torch.tensor([[i] for i in range(len(data))], dtype=torch.float32)
        y = torch.tensor(data, dtype=torch.float32).reshape(-1, 1)

        model = torch.nn.Linear(1, 1)
        loss_fn = torch.nn.MSELoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

        for _ in range(500):  # Reduced epochs for efficiency
            y_pred = model(x)
            loss = loss_fn(y_pred, y)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        return model(torch.tensor([[len(data)]]).float()).item()

    except Exception as e:
        return str(e)