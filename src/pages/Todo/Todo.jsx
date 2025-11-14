import { useEffect, useRef, useState } from "react";
import { Badge, Button, Form, Table, Modal } from "react-bootstrap";
import { fetchTodos } from "../data/todos";
import "./Todo.css";

function Todo() {
  // ----- State -----
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);

  // Filter & Pagination
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);

  // ----- Modal -----
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  // ----- Load Data -----
  useEffect(() => {
    setAllTodos(fetchTodos());
  }, []);

  // ----- Filter -----
  useEffect(() => {
    const filtered = onlyWaiting
      ? allTodos.filter((t) => !t.completed)
      : allTodos;
    setTodos(filtered);
  }, [onlyWaiting, allTodos]);

  // ----- Pagination -----
  useEffect(() => {
    const totalPages = Math.ceil(todos.length / itemsPerPage);
    setNumPages(totalPages > 0 ? totalPages : 1);
  }, [itemsPerPage, todos]);

  useEffect(() => {
    setCurPage(1);
  }, [numPages]);

  // ----- Function: เปลี่ยน waiting -> done -----
  const handleMarkDone = (id) => {
    const updated = allTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setAllTodos(updated);
  };

  // ----- Function: ลบ todo -----
  const handleDelete = (id) => {
    setAllTodos(allTodos.filter((t) => t.id !== id));
  };

  // ----- Function: บันทึก todo ใหม่ -----
  const handleSave = () => {
    const id =
      allTodos.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1;
    const title = newTitleRef.current.value.trim();
    if (title === "") return alert("กรุณากรอกชื่อ todo");

    const newTodo = {
      userId: 1,
      id,
      title,
      completed: false,
    };
    setAllTodos([...allTodos, newTodo]);
    handleClose();
  };

  // ----- Pagination Slice -----
  const startIndex = (curPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const todosToShow = todos.slice(startIndex, endIndex);

  // ----- Render -----
  return (
    <div className="todo-container">
      {/* ---------- Modal Add Todo ---------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value={
                  allTodos.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1
                }
                disabled
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={newTitleRef}
                placeholder="Enter todo title..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------- Filter Section ---------- */}
      <div className="todo-filter-container d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="switchCheckChecked"
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <label htmlFor="switchCheckChecked" className="ms-2">
            Show only&nbsp;
            <Button variant="warning" style={{ pointerEvents: "none" }}>
              waiting&nbsp;<i className="bi bi-clock"></i>
            </Button>
          </label>
        </div>

        <Form.Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          style={{ width: "200px" }}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </Form.Select>
      </div>

      {/* ---------- Table Section ---------- */}
      <Table striped hover>
        <thead className="table-dark">
          <tr>
            <th className="text-center" style={{ width: "4rem" }}>
              ID
            </th>
            <th>Title</th>
            <th className="text-end" style={{ width: "12rem" }}>
              Completed&nbsp;
              <Button onClick={handleShow}>
                <i className="bi bi-plus"></i>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {todosToShow.map((todo) => (
            <tr key={todo.id}>
              <td className="text-center">
                <Badge bg="secondary">{todo.id}</Badge>
              </td>
              <td>{todo.title}</td>
              <td className="text-end">
                {todo.completed ? (
                  <Badge bg="success">
                    done&nbsp;<i className="bi bi-check"></i>
                  </Badge>
                ) : (
                  <Button
                    variant="warning"
                    onClick={() => handleMarkDone(todo.id)}
                  >
                    waiting&nbsp;<i className="bi bi-clock"></i>
                  </Button>
                )}
                &nbsp;
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>
                  <i className="bi bi-trash3"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ---------- Pagination Section ---------- */}
      <div className="text-center mt-3">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage} / {numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
}

export default Todo;
